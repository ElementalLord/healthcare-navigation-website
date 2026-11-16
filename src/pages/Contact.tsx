import { ContactForm } from '@/components/ContactForm'
import { Container, PageHero } from '@/components/section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { hasContactEmail, site } from '@/config/site'

export default function Contact() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Get in touch"
        intro="For community organizations, possible advisors, and volunteers. We can’t give medical, legal, or immigration advice, or help in an emergency."
      />
      <Container className="grid gap-12 py-14 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          <div className="border-t-4 border-ink pt-4">
            <h2 className="text-xl font-bold text-ink">Email</h2>
            {hasContactEmail ? (
              <a href={`mailto:${site.contactEmail}`} className="mt-2 block text-lg font-bold text-route-blue underline underline-offset-4">
                {site.contactEmail}
              </a>
            ) : (
              <p className="mt-2 text-lg">We are setting up a monitored email address. Until then, these forms are demos only.</p>
            )}
          </div>
          <div className="border-t-4 border-alert pt-4">
            <h2 className="text-xl font-bold text-alert">Need help right now?</h2>
            <p className="mt-2 text-lg">{site.emergency.text}</p>
          </div>
        </div>

        <Tabs defaultValue="contact">
          <TabsList>
            <TabsTrigger value="contact">Contact us</TabsTrigger>
            <TabsTrigger value="feedback">Website feedback</TabsTrigger>
          </TabsList>
          <TabsContent value="contact">
            <ContactForm kind="contact" />
          </TabsContent>
          <TabsContent value="feedback">
            <ContactForm kind="feedback" />
          </TabsContent>
        </Tabs>
      </Container>
    </>
  )
}
