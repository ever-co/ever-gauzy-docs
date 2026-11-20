/**
 * Footer theme selector: System / Light / Dark, the current choice pressed.
 *
 * `colorModeChoice` is null while the visitor has not picked a theme; the site then follows the
 * OS theme (respectPrefersColorScheme), and `setColorMode(null)` goes back to that. The navbar
 * toggle cycles through the same three choices; here they sit side by side.
 *
 * The server and the first client render are the same: no option is pressed until React has
 * hydrated and read the stored choice, so the static HTML never claims a choice.
 */
import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useColorMode} from '@docusaurus/theme-common';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconSystemColorMode from '@theme/Icon/SystemColorMode';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import styles from './styles.module.css';

type ColorModeChoice = ReturnType<typeof useColorMode>['colorModeChoice'];

type Option = {
  choice: ColorModeChoice;
  label: string;
  Icon: typeof IconLightMode;
};

function useOptions(): Option[] {
  return [
    {
      choice: null,
      label: translate({
        id: 'theme.footer.themeSelector.system',
        message: 'System theme',
        description: 'The footer theme selector option that follows the OS theme',
      }),
      Icon: IconSystemColorMode,
    },
    {
      choice: 'light',
      label: translate({
        id: 'theme.footer.themeSelector.light',
        message: 'Light theme',
        description: 'The footer theme selector option for the light theme',
      }),
      Icon: IconLightMode,
    },
    {
      choice: 'dark',
      label: translate({
        id: 'theme.footer.themeSelector.dark',
        message: 'Dark theme',
        description: 'The footer theme selector option for the dark theme',
      }),
      Icon: IconDarkMode,
    },
  ];
}

export default function ThemeSelector({className}: {className?: string}): ReactNode {
  const {colorModeChoice, setColorMode} = useColorMode();
  const isBrowser = useIsBrowser();
  const options = useOptions();
  return (
    <div
      role="group"
      aria-label={translate({
        id: 'theme.footer.themeSelector.label',
        message: 'Theme',
        description: 'The ARIA label of the footer theme selector',
      })}
      className={clsx(styles.themeSelector, className)}>
      {options.map(({choice, label, Icon}) => (
        <button
          key={choice ?? 'system'}
          type="button"
          className={styles.themeOption}
          aria-label={label}
          title={label}
          aria-pressed={isBrowser && colorModeChoice === choice}
          onClick={() => setColorMode(choice)}>
          <Icon aria-hidden className={styles.themeIcon} />
        </button>
      ))}
    </div>
  );
}
