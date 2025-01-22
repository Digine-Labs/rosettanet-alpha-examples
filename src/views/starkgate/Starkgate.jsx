import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import StarkgateDeposit from './StarkgateDeposit';
import StarkgateWithdraw from './StarkgateWithdraw';

export default function Starkgate() {
  return (
    <Container maxW="3xl" overflow={'hidden'}>
      <Tabs>
        <TabList>
          <Tab>Deposit</Tab>
          <Tab>Withdraw</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <StarkgateDeposit />
          </TabPanel>
          <TabPanel>
            <StarkgateWithdraw />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
