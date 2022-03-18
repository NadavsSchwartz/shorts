/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const QuickStart = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Box marginBottom={2}>
          <Typography
            variant="h4"
            color="text.primary"
            align={'center'}
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            Don't feel like using the website? No Problem!
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
            align={'center'}
          >
            you can make a request with the long url you desire to shorten
            directly to our api, making it easy to implement it within your app,
            you can even shorten urls from the command line!
          </Typography>
        </Box>
      </Box>
      <Box
        component={SyntaxHighlighter}
        language={'javascript'}
        style={vs2015}
        padding={`${theme.spacing(2)} !important`}
        borderRadius={2}
        margin={`${theme.spacing(0)} !important`}
        bgcolor={'#21325b !important'}
      >
        {`
> $ curl -XPOST -H "Content-type: application/json" -d '{"longUrl":"https://www.google.com"}' 'http://localhost:4000/url'

// {"urlId":"yDDqG2s","longUrl":"https://www.google.com","shortUrl":"http://localhost:4000/Qri0_bg","siteIcon":"https://www.google.com/favicon.ico"}


> $ curl -XGET -H "Content-type: application/json" 'http://localhost:4000/url/yDDqG2s'

// {"_id":"6233e5a5b3a12ac378c90c93","totalClicks":0,"location":[],"clicks":[],"createdAt":"2022-03-18T01:51:33.932Z","updatedAt":"2022-03-18T01:51:34.075Z"}
        `}
      </Box>
    </Box>
  );
};

export default QuickStart;
