import { MotionConfig } from 'framer-motion'
import { HashRouter, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/layout/Layout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Directory from '@/pages/Directory'
import GetInvolved from '@/pages/GetInvolved'
import GuideDetail from '@/pages/GuideDetail'
import Guides from '@/pages/Guides'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Organizations from '@/pages/Organizations'

/**
 * Pages and their addresses.
 * We use HashRouter (URLs look like /#/guides) so the site works on GitHub Pages
 * without any server setup.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="guides" element={<Guides />} />
            <Route path="guides/:slug" element={<GuideDetail />} />
            <Route path="directory" element={<Directory />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="get-involved" element={<GetInvolved />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </MotionConfig>
  )
}
