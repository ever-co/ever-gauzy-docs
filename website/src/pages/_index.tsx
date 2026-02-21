/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from '../components/magicui/magicui.module.css';

function ParticlesBackground() {
  return (
    <BrowserOnly fallback={<div />}>
      {() => {
        const Particles = require('../components/magicui/Particles').default;
        return <Particles quantity={60} color="#8B5CF6" size={0.5} />;
      }}
    </BrowserOnly>
  );
}

function DarkParticlesBackground() {
  return (
    <BrowserOnly fallback={<div />}>
      {() => {
        const Particles = require('../components/magicui/Particles').default;
        return <Particles quantity={60} color="#c4b5fd" size={0.5} />;
      }}
    </BrowserOnly>
  );
}

function AnimatedTitle({ text }: { text: string }) {
  return (
    <BrowserOnly fallback={<h1 className={styles.heroTitle}>{text}</h1>}>
      {() => {
        const TextAnimate = require('../components/magicui/TextAnimate').default;
        return (
          <TextAnimate
            animation="blurInUp"
            by="word"
            delay={0.1}
            duration={0.6}
            className={styles.heroTitle}
          >
            {text}
          </TextAnimate>
        );
      }}
    </BrowserOnly>
  );
}

function AnimatedSubtitle({ text }: { text: string }) {
  return (
    <BrowserOnly fallback={<p className={styles.heroSubtitle}>{text}</p>}>
      {() => {
        const TextAnimate = require('../components/magicui/TextAnimate').default;
        return (
          <TextAnimate
            animation="fadeIn"
            by="text"
            delay={0.8}
            duration={0.8}
            className={styles.heroSubtitle}
            style={{ justifyContent: 'center' }}
          >
            {text}
          </TextAnimate>
        );
      }}
    </BrowserOnly>
  );
}

function GridPatternBg() {
  return (
    <BrowserOnly fallback={<div />}>
      {() => {
        const AnimatedGridPattern = require('../components/magicui/AnimatedGridPattern').default;
        return (
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.15}
            duration={3}
            strokeColor="rgba(139, 92, 246, 0.2)"
            fillColor="rgba(139, 92, 246, 0.08)"
          />
        );
      }}
    </BrowserOnly>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <BrowserOnly
      fallback={
        <div style={{ padding: '1.75rem', background: '#fff', borderRadius: '16px' }}>
          <span className={styles.featureIcon}>{icon}</span>
          <h3 className={styles.featureTitle}>{title}</h3>
          <p className={styles.featureDesc}>{description}</p>
        </div>
      }
    >
      {() => {
        const MagicCard = require('../components/magicui/MagicCard').default;
        return (
          <MagicCard
            gradientFrom="#8B5CF6"
            gradientTo="#EC4899"
            gradientColor="rgba(139, 92, 246, 0.06)"
            gradientOpacity={0.6}
          >
            <span className={styles.featureIcon}>{icon}</span>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDesc}>{description}</p>
          </MagicCard>
        );
      }}
    </BrowserOnly>
  );
}

function ShimmerCTA({ href, children }: { href: string; children: string }) {
  return (
    <BrowserOnly
      fallback={
        <Link
          className="button button--outline button--primary button--lg"
          to={href}
        >
          {children}
        </Link>
      }
    >
      {() => {
        const ShimmerButton = require('../components/magicui/ShimmerButton').default;
        return <ShimmerButton href={href}>{children}</ShimmerButton>;
      }}
    </BrowserOnly>
  );
}

const features = [
  {
    icon: '👥',
    title: 'Human Resources',
    description: 'Complete employee lifecycle — onboarding, profiles, departments, positions, and organizational charts.',
  },
  {
    icon: '⏱️',
    title: 'Time Tracking',
    description: 'Automated timers, screenshots, activity levels, timesheets, and idle detection across desktop and web.',
  },
  {
    icon: '📋',
    title: 'Project Management',
    description: 'Tasks, sprints, Kanban boards, Gantt charts, and team collaboration with real-time updates.',
  },
  {
    icon: '💰',
    title: 'Financial Management',
    description: 'Invoicing, expense tracking, payments, estimates, and multi-currency accounting.',
  },
  {
    icon: '🔗',
    title: 'Integrations & Plugins',
    description: '39 plugins including GitHub, Jira, Hubstaff, Zapier, WakaTime, and AI-powered matching.',
  },
  {
    icon: '📊',
    title: 'Reports & Analytics',
    description: 'Dashboards, time reports, project budgets, employee statistics, and exportable data.',
  },
];

function HomepageHeader(): JSX.Element {
  const { siteConfig, i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const title = translate({ id: 'home.message', message: siteConfig.title }, currentLocale);
  const tagline = translate({ id: 'home.mesdescriptionsage', message: siteConfig.tagline }, currentLocale);

  return (
    <header className={styles.heroSection}>
      <ParticlesBackground />
      <div className={styles.heroContent}>
        <AnimatedTitle text={title} />
        <AnimatedSubtitle text={tagline} />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <ShimmerCTA href="/docs/intro">
            {translate({ id: 'homeActionLink.message', message: 'Get Started' })}
          </ShimmerCTA>
          <Link
            className="button button--outline button--lg"
            to="https://github.com/ever-co/ever-gauzy"
            style={{
              borderRadius: '999px',
              borderColor: 'rgba(139, 92, 246, 0.3)',
              color: 'inherit',
              fontWeight: 600,
              padding: '0.85rem 2.25rem',
            }}
          >
            ⭐ GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeaturesSection(): JSX.Element {
  return (
    <section style={{ padding: '4rem 0' }}>
      <h2 className={styles.sectionTitle}>Everything You Need</h2>
      <p className={styles.sectionSubtitle}>
        A complete open-source platform for business management, time tracking, and team collaboration.
      </p>
      <div className={styles.featureGrid}>
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
}

function OverviewSection(): JSX.Element {
  return (
    <section className={styles.overviewSection}>
      <GridPatternBg />
      <div className={styles.overviewImageWrap}>
        <img
          src="/overview_no_logo.png"
          alt="Ever Gauzy Platform Overview"
          className={styles.overviewImage}
        />
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <FeaturesSection />
        <OverviewSection />
      </main>
    </Layout>
  );
}
