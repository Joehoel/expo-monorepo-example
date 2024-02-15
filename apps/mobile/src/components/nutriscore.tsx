import * as React from 'react';
import { SvgProps } from 'react-native-svg';
import { match } from 'ts-pattern';

import A from '../../assets/nutriscore/a.svg';
import B from '../../assets/nutriscore/b.svg';
import C from '../../assets/nutriscore/c.svg';
import D from '../../assets/nutriscore/d.svg';
import E from '../../assets/nutriscore/e.svg';

type NutriscoreProps = SvgProps & {
  score: 'A' | 'B' | 'C' | 'D' | 'E';
};

export function Nutriscore({ score, ...props }: NutriscoreProps) {
  return match(score)
    .with('A', () => <A {...props} />)
    .with('B', () => <B {...props} />)
    .with('C', () => <C {...props} />)
    .with('D', () => <D {...props} />)
    .with('E', () => <E {...props} />)
    .otherwise(() => <></>);
}
