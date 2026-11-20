/**
 * Wrapped Footer/Copyright: the copyright line, then the System / Light / Dark theme selector.
 *
 * The footer renders on every page (globally, and inside the content column on docs pages, see
 * DocRoot/Layout/Main), so the selector is always one scroll away, on mobile too. Wrapping keeps
 * the stock footer; only its bottom row gains the selector.
 */
import React, {type ReactNode} from 'react';
import Copyright from '@theme-original/Footer/Copyright';
import type CopyrightType from '@theme/Footer/Copyright';
import type {WrapperProps} from '@docusaurus/types';
import ThemeSelector from '@site/src/components/ThemeSelector';

type Props = WrapperProps<typeof CopyrightType>;

export default function CopyrightWrapper(props: Props): ReactNode {
  return (
    <>
      <Copyright {...props} />
      <div className="margin-top--sm">
        <ThemeSelector />
      </div>
    </>
  );
}
