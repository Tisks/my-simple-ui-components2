import React from 'react';
import { FC } from 'react';
import { FooterContext } from '.';
import { TFooterContext } from './types';

export const FooterProvider: FC<TFooterContext> = ({ children, ...rest }) => {
    return <FooterContext.Provider value={{ ...rest }}>{children}</FooterContext.Provider>;
};
