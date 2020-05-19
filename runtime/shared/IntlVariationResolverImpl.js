/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 * @flow strict-local
 */
const IntlNumberType = require('IntlNumberType');
const IntlVariations = require('IntlVariations');
const IntlViewerContext = require('IntlViewerContext');

const invariant = require('invariant');

const EXACTLY_ONE = '_1';

const IntlVariationResolverImpl = {
  EXACTLY_ONE,

  /**
   * Wrapper around FbtNumberType.getVariation that special cases our EXACTLY_ONE
   * value to accommodate the singular form of fbt:plural
   */
  getNumberVariations(
    number: number,
  ): Array<$FlowFixMe | $TEMPORARY$string<'*'> | $TEMPORARY$string<'_1'>> {
    const numType = IntlNumberType.get(IntlViewerContext.locale).getVariation(
      number,
    );
    invariant(
      // eslint-disable-next-line no-bitwise
      numType & IntlVariations.BITMASK_NUMBER,
      'Invalid number provided: %s (%s)',
      numType,
      typeof numType,
    );
    return number === 1 ? [EXACTLY_ONE, numType, '*'] : [numType, '*'];
  },

  /**
   * Wrapper to validate gender.
   */
  getGenderVariations(gender: number): Array<$TEMPORARY$string<'*'> | number> {
    invariant(
      // eslint-disable-next-line no-bitwise
      gender & IntlVariations.BITMASK_GENDER,
      'Invalid gender provided: %s (%s)',
      gender,
      typeof gender,
    );
    return [gender, '*'];
  },
};

module.exports = IntlVariationResolverImpl;
