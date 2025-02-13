import React from 'react';
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import EndurLstStake from './endurLstStake';
import EndurLstUnstake from './endurLstUnstake';

export default function EndurLst() {
  return (
    <Container maxW="3xl" overflow={'hidden'}>
      <Tabs>
        <TabList>
          <Tab>Stake</Tab>
          <Tab>Unstake</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EndurLstStake />
          </TabPanel>
          <TabPanel>
            <EndurLstUnstake />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
