import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqGroupItem = ({ title, items }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={2}>
        <Typography fontWeight={700} variant={'h5'}>
          {title}
        </Typography>
      </Box>
      <Box>
        {items.map((item, i) => (
          <Box
            component={Accordion}
            key={i}
            padding={1}
            marginBottom={i === item.length - 1 ? 0 : 2}
            borderRadius={`${theme.spacing(1)} !important`}
            sx={{
              '&::before': {
                display: 'none',
              },
            }}
          >
            <Box
              component={AccordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header--${i}`}
            >
              <Typography fontWeight={600}>{item.title}</Typography>
            </Box>
            <AccordionDetails>
              <Typography color="text.secondary">{item.subtitle}</Typography>
            </AccordionDetails>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

FaqGroupItem.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

const Content = () => {
  return (
    <Box>
      <Box marginBottom={6}>
        <FaqGroupItem
          title={'Basics'}
          items={[
            {
              title: `What is a URL Shortener?`,
              subtitle: (
                <>
                  <p>
                    A URL shortener, also known as a link shortener, seems like
                    a simple tool, but it is a service that can dramatically
                    impact your marketing efforts. Link shorteners work by
                    transforming any long URL into a shorter, more readable
                    link.
                  </p>{' '}
                  <br />
                  Then, when a user clicks the shortened version, they’re
                  automatically forwarded to the destination URL.
                  <br />
                  <p>
                    Think of a short URL as a more descriptive and memorable
                    nickname for your long webpage address. You can, for
                    example, use a short URL like shorts.domain/CovidNews so
                    people will have a good idea about where your link will lead
                    before they click it.
                  </p>{' '}
                  You need a URL shortener if you’re contributing content to the
                  online world. Make your URLs stand out with our easy-to-use
                  free link shortener above.`
                </>
              ),
            },
            {
              title: `Benefits of a Short URL`,
              subtitle: (
                <>
                  <p>
                    How many people can even remember a long web address,
                    especially if it has many characters and symbols? A short
                    URL can make your link more memorable. Not only does it
                    allow people to recall and share your link with others
                    easily, but it can also dramatically improve traffic to your
                    content.
                  </p>{' '}
                  <p>
                    On a more practical side, a short URL is also easier to
                    incorporate into your collateral – whether you’re looking to
                    engage with your customers offline or online.
                  </p>
                  <p>
                    Shorts is the best URL shortener for everyone, from
                    influencers to small brands to large enterprises, who are
                    looking for a simple way to create, track and manage their
                    links.
                  </p>
                </>
              ),
            },
            {
              title: 'Why Choose Shorts?',
              subtitle: `Whether you’re sharing one link or millions, our platform was built to help you make every point of connection between your content and your audience ignite action.`,
            },
            {
              title: 'Can I See All The Links I Shortened?',
              subtitle: `Of course. Once you sign up for a free account, every link you shortend will be recorded in your account. You can view all of your shorts at any time.`,
            },
            {
              title: 'Is This A Subscription Service?',
              subtitle: `No. Shorts is and always will be free. No hidden fees, no hidden costs. No Credit Card required.`,
            },
          ]}
        />
      </Box>
      <Box marginBottom={6}>
        <FaqGroupItem
          title={'Account & settings'}
          items={[
            {
              title: 'Account Security',
              subtitle: `Your Account information is protected by a password for your privacy and security. You can help prevent unauthorized access to your Account by selecting and protecting your password appropriately, or making use of one of the social logins, such as google sign in, and limiting access to your computer and browser by signing off after you have ﬁnished accessing your Account.`,
            },

            {
              title: 'Do You Sell Or Share My Information?',
              subtitle:
                'Shorts does not sell any of your personal information. We do not share your personal information with third parties.',
            },
            {
              title: 'Can I Delete My Account?',
              subtitle: `Yes, of course. You can delete your account at any time by logging to the user settings area, and press on "Delete Account". If you’re having trouble deleting your account, please contact us at`,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Content;
