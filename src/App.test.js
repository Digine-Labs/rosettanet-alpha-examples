import { prepareMulticallCalldata } from './utils/multicall';

test('prepare multicall data', () => {
  const calls = [
    {
      to: '0xbb',
      entrypoint: '0xff',
      calldata: ['123', '456'],
    },
    {
      to: '0xcc',
      entrypoint: '0xab',
      calldata: ['123', '456'],
    },
  ];

  const calldata = prepareMulticallCalldata(calls);
  console.log(calldata);
});
