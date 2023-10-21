import {AuthProvider} from '@/store/auth-context';
import {FavMoviesProvider} from '@/store/fav-movies-context';

const combineComponents = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

export const AppProvider = combineComponents(AuthProvider, FavMoviesProvider);