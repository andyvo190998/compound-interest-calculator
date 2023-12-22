import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

type Anchor = 'right';
export default function Help({ open, setOpen }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              asdasd
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              asdsad
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
            <ul style={{ width: '50vw' }}>
              <li>
                <Typography>
                  <Typography sx={{ textDecoration: 'underline' }}>
                    Compound frequency:
                  </Typography>{' '}
                  In this app by this version, it is default by 'Annually'. It
                  is the number of times per year the accumulated interest is
                  paid out.
                </Typography>
              </li>
              <li>
                <Typography>
                  <Typography sx={{ textDecoration: 'underline' }}>
                    Initial deposit:
                  </Typography>
                  is the amount of your first investment
                </Typography>
              </li>
              <li>
                <Typography>
                  <Typography sx={{ textDecoration: 'underline' }}>
                    Monthly contribution:
                  </Typography>
                  is the amount of money you spend every month for investment.
                </Typography>
              </li>
              <li>
                <Typography>
                  <Typography sx={{ textDecoration: 'underline' }}>
                    Investment length:
                  </Typography>
                  is how long you invest. (the longer you invest with interest
                  compound, the more money you will get)
                </Typography>
              </li>
              <li>
                <Typography>
                  <Typography sx={{ textDecoration: 'underline' }}>
                    Interest rate:
                  </Typography>
                  is the amount of interest due per period, as a proportion of
                  the amount lent, deposited, or borrowed. (ex: you create a
                  bank saving account, and the annual interest rate is 4% so
                  every year you will earn 4% from this saving amount.)
                </Typography>
              </li>
            </ul>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
