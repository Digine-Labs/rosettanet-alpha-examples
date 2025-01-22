function addHexPadding(
    value,
    targetLength,
    prefix,
  ) {
    if (value.length === 0) {
      return prefix ? '0x' + '0'.repeat(targetLength) : '0'.repeat(targetLength)
    }
    if (value.length >= targetLength) {
      return value
    }
    if (value.startsWith('0x')) {
      return prefix
        ? '0x' + value.substring(2).padStart(targetLength, '0')
        : value.substring(2).padStart(targetLength, '0')
    }
    return prefix
      ? '0x' + value.padStart(targetLength, '0')
      : value.padStart(targetLength, '0')
  }

export function prepareMulticallCalldata(calls) {
    const calldata = ['0x76971d7f']
    const length = addHexPadding(calls.length.toString(), 64, false);

    calldata.push(length);

    for(const call of calls) {
        calldata.push(addHexPadding(call.to, 64, false));
        calldata.push(addHexPadding(call.entrypoint, 64, false));
        calldata.push(addHexPadding(call.calldata.length.toString(), 64, false));
        calldata.push(...call.calldata.map(c => addHexPadding(c, 64, false)))
    }

    return calldata.join('')
}