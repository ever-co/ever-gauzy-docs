---
sidebar_position: 6
---

# React Components Library

`@gauzy/ui-react-components` is a pure React component library providing UI primitives for building plugin widgets. It has **no Angular or plugin-system dependencies** — it's pure React + TypeScript.

## Installation

```bash
pnpm add @gauzy/ui-react-components
```

## Import

```typescript
import { Card, CardHeader, CardTitle, CardContent, Progress, theme } from '@gauzy/ui-react-components';
```

## Design Tokens

All components use a shared `theme` object that matches the Nebular/NbCard aesthetic of the Angular host application.

```typescript
import { theme } from '@gauzy/ui-react-components';

theme.textPrimary   // '#222b45'   — primary text
theme.textSecondary // '#8f9bb3'   — secondary/hint text
theme.textHint      // '#c5cee0'   — lightest text for decorative elements
theme.bg            // '#ffffff'   — card background (default variant)
theme.bgCard2       // 'rgba(50, 50, 50, 0.02)' — tinted background (accent variant)
theme.border        // '#edf1f7'   — border color
theme.blue          // '#3366ff'   — blue accent
theme.red           // '#ff3d71'   — red accent
theme.orange        // '#ffaa00'   — orange accent
theme.green         // '#00d68f'   — green accent
theme.shadow        // '0 0.5rem 1rem 0 rgba(44, 51, 73, 0.08)'    — default card shadow
theme.shadowLight   // '0px 6px 20px 0px rgba(0, 0, 0, 0.05)'     — light variant shadow
theme.radius        // '0.5rem'    — border radius (8px)
theme.font          // "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
```

Use these tokens in your components for visual consistency with the Angular UI:

```tsx
const MyWidget = () => (
  <div style={{ color: theme.textPrimary, fontFamily: theme.font }}>
    <span style={{ color: theme.green }}>Active</span>
  </div>
);
```

---

## Card (Compound Components)

The Card system uses a **shadcn-style compound component pattern** for flexible, composable card layouts.

### Basic Usage

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@gauzy/ui-react-components';

function MyWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Summary</CardTitle>
        <CardDescription>Time tracked this week</CardDescription>
      </CardHeader>
      <CardContent>
        <p>42 hours tracked across 5 projects</p>
      </CardContent>
      <CardFooter>
        <button>View Details</button>
      </CardFooter>
    </Card>
  );
}
```

### With Actions

```tsx
import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@gauzy/ui-react-components';

function SettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardAction>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleSave}>Save</button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {/* settings form */}
      </CardContent>
    </Card>
  );
}
```

### Accent Variant

```tsx
<Card variant="accent">
  <CardContent>
    Tinted background with lighter shadow
  </CardContent>
</Card>
```

### Component Reference

#### Card

Root container. All other Card components are optional children.

```typescript
interface CardProps {
  children?: ReactNode;
  variant?: 'default' | 'accent';
  style?: CSSProperties;
  className?: string;
}
```

| Variant | Background | Shadow |
|---------|-----------|--------|
| `default` | `#ffffff` | `0 0.5rem 1rem 0 rgba(44, 51, 73, 0.08)` |
| `accent` | `rgba(50, 50, 50, 0.02)` | `0px 6px 20px 0px rgba(0, 0, 0, 0.05)` |

Both variants share: 1px solid `#edf1f7` border, `0.5rem` border-radius, `overflow: hidden`.

#### CardHeader

Header section with bottom border separator. Uses relative positioning so `CardAction` can position absolutely.

```typescript
interface CardHeaderProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
```

- Layout: flex column, gap `0.375rem`
- Padding: `1rem 1.25rem`
- Bottom border: 1px solid `#edf1f7`

#### CardTitle

Rendered as `<h3>`.

```typescript
interface CardTitleProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
```

- Font-size: `1.125rem` (18px), weight: 600
- Color: `#222b45`

#### CardDescription

Rendered as `<p>`. Secondary text beneath the title.

```typescript
interface CardDescriptionProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
```

- Font-size: `0.8125rem` (13px)
- Color: `#8f9bb3`

#### CardAction

Positioned absolutely in the top-right corner of `CardHeader`. Must be a direct child of `CardHeader`.

```typescript
interface CardActionProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
```

- Position: absolute, top `1rem`, right `1.25rem`
- Layout: flex row, gap `0.5rem`

#### CardContent

Main body content section.

```typescript
interface CardContentProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
```

- Padding: `1rem 1.25rem`

#### CardFooter

Footer section with top border separator.

```typescript
interface CardFooterProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}
```

- Layout: flex row, center-aligned
- Padding: `1rem 1.25rem`
- Top border: 1px solid `#edf1f7`

---

## WidgetCard

A pre-styled stat/metric card built on `Card` + `CardContent`. Designed for dashboard widget use cases.

```typescript
interface WidgetCardProps {
  label: string;              // Stat label (secondary text)
  value: string | number;     // Stat value (primary display)
  loading?: boolean;          // Shows em-dash and hint color when true
  children?: ReactNode;       // Optional content below value
}
```

### Usage

```tsx
import { WidgetCard } from '@gauzy/ui-react-components';

<WidgetCard label="Hours Today" value="6h 32m" />
<WidgetCard label="Activity" value="78%" loading={isLoading} />
<WidgetCard label="Team Members" value={12}>
  <ColorDots count={12} />
</WidgetCard>
```

### Layout

```
┌─────────────────────────────┐
│ Stat Label              ⋮   │  ← label (13px, secondary color) + decorative ellipsis
│                              │
│ 6h 32m                       │  ← value (30px, bold, -0.02em letter-spacing)
│ [optional children]          │  ← children slot
└─────────────────────────────┘
```

- Loading state: shows em-dash (`—`) in hint color instead of value
- Min-width: `140px`, flex: `1 1 0` (responsive flex grow)

---

## Progress

A linear progress bar with smooth animation.

```typescript
interface ProgressProps {
  percent: number;    // 0–100 (clamped)
  color: string;      // Foreground color (e.g., theme.blue)
}
```

### Usage

```tsx
import { Progress, theme } from '@gauzy/ui-react-components';

<Progress percent={75} color={theme.green} />
<Progress percent={30} color={theme.orange} />
<Progress percent={90} color={theme.blue} />
```

### Styling

- Track: 4px tall, `#edf1f7` background, 2px border-radius
- Fill: animated width transition (`0.4s ease`), custom color
- Values are clamped to 0–100%

---

## ColorDots

Renders a row of colored circular dots — useful for visual count indicators.

```typescript
interface ColorDotsProps {
  count: number;         // Number of dots to render
  colors?: string[];     // Custom color array (cycles for count > length)
}
```

### Default Colors

```typescript
['#ffaa00', '#ff6b35', '#ffcc02', '#ff8c00', '#ffd700']
```

### Usage

```tsx
import { ColorDots } from '@gauzy/ui-react-components';

<ColorDots count={5} />
<ColorDots count={8} colors={[theme.blue, theme.green, theme.orange]} />
```

### Styling

- Dot size: 10px × 10px circles
- Gap: `0.3rem` (4.8px)
- Colors cycle: `colors[i % colors.length]`

---

## Utility Functions

### formatDuration

Converts seconds to `HH:mm:ss` format.

```typescript
function formatDuration(totalSeconds: number): string
```

```tsx
import { formatDuration } from '@gauzy/ui-react-components';

formatDuration(3661)   // "01:01:01"
formatDuration(7200)   // "02:00:00"
formatDuration(45)     // "00:00:45"
formatDuration(0)      // "00:00:00"
```

- Input clamped to `>= 0`
- Always returns zero-padded two-digit segments

### currentWeekRange

Returns the current week's date range (Monday–Sunday).

```typescript
function currentWeekRange(): { startDate: Date; endDate: Date }
```

```tsx
import { currentWeekRange } from '@gauzy/ui-react-components';

const { startDate, endDate } = currentWeekRange();
// startDate: Monday 00:00:00.000
// endDate:   Sunday 23:59:59.999
```

### todayRange

Returns today's date range.

```typescript
function todayRange(): { todayStart: Date; todayEnd: Date }
```

```tsx
import { todayRange } from '@gauzy/ui-react-components';

const { todayStart, todayEnd } = todayRange();
// todayStart: today 00:00:00.000
// todayEnd:   today 23:59:59.999
```

---

## Full Example: Dashboard Widget

```tsx
import {
  Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent,
  WidgetCard, Progress, ColorDots,
  theme, formatDuration
} from '@gauzy/ui-react-components';
import { useTranslation, usePluginSetting } from '@gauzy/ui-react';

export function TimeTrackingDashboard() {
  const { t } = useTranslation();
  const showMembers = usePluginSetting<boolean>('my-plugin', 'showMembers', true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Stat cards row */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <WidgetCard label={t('WORKED_TODAY')} value={formatDuration(23400)} />
        <WidgetCard label={t('ACTIVITY')} value="76%" />
        <WidgetCard label={t('PROJECTS')} value={5}>
          <ColorDots count={5} />
        </WidgetCard>
      </div>

      {/* Detail card */}
      {showMembers && (
        <Card>
          <CardHeader>
            <CardTitle>{t('TEAM_ACTIVITY')}</CardTitle>
            <CardDescription>This week's progress</CardDescription>
            <CardAction>
              <button>Refresh</button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>
                <span>Alice</span>
                <Progress percent={85} color={theme.green} />
              </div>
              <div>
                <span>Bob</span>
                <Progress percent={62} color={theme.blue} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

## Package Structure

```
packages/ui-react-components/src/
├── index.ts                          # Public API
└── lib/
    ├── theme.ts                      # Design tokens
    ├── components/
    │   ├── ui/
    │   │   ├── index.ts              # Card compound exports
    │   │   ├── Card.tsx
    │   │   ├── CardHeader.tsx
    │   │   ├── CardTitle.tsx
    │   │   ├── CardDescription.tsx
    │   │   ├── CardAction.tsx
    │   │   ├── CardContent.tsx
    │   │   └── CardFooter.tsx
    │   ├── WidgetCard.tsx
    │   ├── Progress.tsx
    │   └── ColorDots.tsx
    └── helpers/
        ├── format-duration.ts
        ├── current-week-range.ts
        └── today-range.ts
```

## Related

- [React Bridge](./react-bridge) — mounting React inside Angular
- [Plugin Services](./plugin-services) — events, settings, state hooks
- [API Reference](./api-reference) — complete type reference
