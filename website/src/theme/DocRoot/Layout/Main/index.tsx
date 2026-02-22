/**
 * Swizzled DocRoot/Layout/Main — embeds the site footer INSIDE
 * the content column so the sidebar is completely unaffected.
 *
 * The original component just renders {children} inside <main>.
 * We add <Footer /> after the children wrapper.
 */
import React from 'react';
import clsx from 'clsx';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import Footer from '@theme/Footer';
import styles from './styles.module.css';

export default function DocRootLayoutMain({hiddenSidebarContainer, children}) {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        styles.docMainContainer,
        (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced,
      )}>
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
        )}>
        {children}
      </div>
      {/* Footer rendered inside the content column, below page content */}
      <div className={styles.docFooterWrapper}>
        <Footer />
      </div>
    </main>
  );
}
