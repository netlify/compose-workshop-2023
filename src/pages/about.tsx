import composeLogo from '~/assets/compose-logo.svg';
import netlifyLogo from '~/assets/netlify-logo.svg';
import netlifyMonogram from '~/assets/netlify-monogram.svg';
import Link from '~/components/ui/Link';

export default function About() {
  const linkStyles = 'text-[#30e6e2] hover:underline hover:text-[#defffe]';
  return (
    <section className="text-white">
      <div className="my-8 flex flex-col justify-center items-center">
        <img
          alt="Netlify logo"
          className="my-2"
          height={90}
          src={netlifyLogo}
          width={220}
        />
        <img
          alt="Compose logo"
          className="my-2"
          height={105}
          src={composeLogo}
          width={600}
        />
      </div>
      <div className="flex justify-center">
        <div className="max-w-[600px]">
          <h1 className="text-center text-xl mb-8">
            Welcome to the{' '}
            <Link
              className={linkStyles}
              to="https://www.netlify.com/conference/"
            >
              <strong>Netlify Compose 2023</strong>
            </Link>{' '}
            conference!
          </h1>
          <p>
            This site is used as the demo site for Netlify Compose 2023
            workshop. During this workshop, you will learn how to:
          </p>
          <ul className="mt-8 list-disc pl-5">
            <li>Create your first site on Netlify</li>
            <li>Trigger builds with Git and embrace a CI/CD workflow</li>
            <li>
              Create Deploy Previews and collaborate using the Netlify Drawer
            </li>
            <li>
              Use environment variables securely in a serverless environment
            </li>
            <li>Stream API responses from OpenAI using Netlify Functions</li>
            <li>Personalize user experiences with Netlify Edge Functions</li>
            <li>
              Persist cache from API responses using fine-grain cache control
            </li>
            <li>
              Fetch content from Contentstack and Storyblok using Netlify
              Connect
            </li>
            <li>
              Build a custom connector using the{' '}
              <Link
                className={linkStyles}
                to="https://netlifysdk.com/get-started/introduction/"
              >
                Netlify SDK
              </Link>{' '}
              to pull data from Amazon S3
            </li>
          </ul>
          <h3 className="text-center mt-8">
            Clone the{' '}
            <Link
              className={linkStyles}
              to="https://github.com/netlify/workshop_first-composable-project"
            >
              workshop GitHub repo
            </Link>{' '}
            to get started.
          </h3>
          <div className="my-8 flex flex-col justify-center items-center">
            <Link to="https://netlify.com" target="_blank">
              <img
                alt="Compose logo"
                className="my-2"
                height={64}
                src={netlifyMonogram}
                width={64}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
