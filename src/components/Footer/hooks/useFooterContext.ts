import { useContext } from 'react';
import { FooterContext } from '../context';

export const useFooterContext = () => {
    const context = useContext(FooterContext);
    return context;
};
