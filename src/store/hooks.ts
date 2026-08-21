import { useDispatch, useSelector } from 'react-redux';

import type { DispatchStore, ReduxState } from './store';

export const useTypeDispatch = useDispatch.withTypes<DispatchStore>();
export const useTypeSelector = useSelector.withTypes<ReduxState>();
