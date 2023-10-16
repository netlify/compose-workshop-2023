import { useEffect, useState } from 'react';
import Link from '~/components/ui/Link';
import { getAbout } from '~/graphql';

export default function About() {
  const [aboutData, setAboutData] = useState<{
    content: {
      title: string;
      headerImage: {
        filename: string;
      };
      subHeaderImage: {
        filename: string;
      };
      footerImage: {
        filename: string;
      };
      description: string;
      body: {
        items: {
          _uid: string;
          itemValue: string;
        }[];
      }[];
    };
  }>();

  useEffect(() => {
    getAbout()
      .then(d => {
        const content = JSON.parse(d?.content);
        setAboutData({
          ...d,
          content,
        });
      })
      .catch(e => console.error(e));
  }, []);

  const titleSplit = aboutData?.content?.title?.split('Netlify Compose 2023');

  const linkStyles = 'text-[#30e6e2] hover:underline hover:text-[#defffe]';
  return (
    <section className="text-white">
      {aboutData?.content?.headerImage ? (
        <div className="my-8 flex flex-col justify-center items-center">
          <img
            alt="Netlify logo"
            className="my-2"
            height={90}
            src={aboutData?.content?.headerImage?.filename}
            width={220}
          />
          <img
            alt="Compose logo"
            className="my-2"
            height={105}
            src={aboutData?.content?.subHeaderImage?.filename}
            width={600}
          />
        </div>
      ) : null}

      <div className="flex justify-center">
        <div className="max-w-[600px]">
          <h1 className="text-center text-xl mb-8">
            {titleSplit?.[0]}
            <Link
              className={linkStyles}
              to="https://www.netlify.com/conference/"
            >
              <strong>Netlify Compose 2023</strong>
            </Link>{' '}
            {titleSplit?.[1]}
          </h1>
          <p>{aboutData?.content?.description}</p>
          <ul className="mt-8 list-disc pl-5">
            {aboutData?.content?.body?.map(({ items }) => {
              return items?.map(i => {
                return <li key={i?._uid}>{i.itemValue}</li>;
              });
            })}
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
          {aboutData?.content?.footerImage ? (
            <div className="my-8 flex flex-col justify-center items-center">
              <Link to="https://netlify.com" target="_blank">
                <img
                  alt="Compose logo"
                  className="my-2"
                  height={64}
                  src={aboutData?.content?.footerImage?.filename}
                  width={64}
                />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
