

import Heading from '@theme/Heading';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.css';

import Link from '@docusaurus/Link';
function UserspageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title text--primary">
        Who is Using This?
        </Heading>
        <p className="hero__subtitle text--primary">This project is used by many folks</p>
        <div className="logos"><a href="https://www.facebook.com"><img src="/img/docusaurus.svg" alt="User1" title="User1"/></a></div>

        <p className="hero__subtitle text--primary">Are you using this project?</p>
        <div className={styles.buttons}>
          <Link
            className="button button--outline button--primary button--lg text-text--primary border--primary"
            to="/docs/intro">
            Add your company
          </Link>
        </div>
      </div>
    </header>
  );
  }
  

export default function Users() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title={`${siteConfig.title}`}
        description={siteConfig.tagline}>
        <UserspageHeader />
      </Layout>
    );
  }
  