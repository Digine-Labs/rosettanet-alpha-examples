function addHexPadding(value, targetLength, prefix) {
  if (value.length === 0) {
    return prefix ? '0x' + '0'.repeat(targetLength) : '0'.repeat(targetLength);
  }
  if (value.startsWith('0x')) {
    return prefix
      ? '0x' + value.substring(2).padStart(targetLength, '0')
      : value.substring(2).padStart(targetLength, '0');
  }
  return prefix
    ? '0x' + value.padStart(targetLength, '0')
    : value.padStart(targetLength, '0');
}

export function prepareMulticallCalldata(calls) {
  const calldata = ['0x76971d7f'];
  console.log(calls.length.toString(16));
  const length = addHexPadding(calls.length.toString(16), 64, false);
  console.log(length);

  calldata.push(length);

  for (const call of calls) {
    calldata.push(addHexPadding(call.to, 64, false).replace('0x', ''));
    calldata.push(addHexPadding(call.entrypoint, 64, false).replace('0x', ''));
    calldata.push(
      addHexPadding(call.calldata.length.toString(16), 64, false).replace(
        '0x',
        ''
      )
    );
    console.log(
      addHexPadding(call.calldata.length.toString(16), 64, false).replace(
        '0x',
        ''
      )
    );

    console.log(call.calldata.length);
    calldata.push(
      ...call.calldata.map(c => addHexPadding(c, 64, false).replace('0x', ''))
    );
  }

  return calldata.join('');
}
