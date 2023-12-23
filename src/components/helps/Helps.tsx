import Drawer from '@mui/material/Drawer';
import { Typography } from '@mui/material';
import React from 'react';
interface ChildComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Help: React.FC<ChildComponentProps> = ({ open, setOpen }) => {
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
};

export default Help;
