import React from 'react';

export const BrowserRouter = ({ children }) =>
  React.createElement('div', { 'data-testid': 'router' }, children);

export const Routes = ({ children }) =>
  React.createElement('div', { 'data-testid': 'routes' }, children);

export const Route = ({ element }) => element;

export const Navigate = () =>
  React.createElement('div', { 'data-testid': 'navigate' }, 'Navigate to Home');

export const NavLink = ({ children, ...props }) =>
  React.createElement('a', { 'data-testid': 'navlink', ...props }, children);

export const Link = ({ children, ...props }) =>
  React.createElement('a', { 'data-testid': 'link', ...props }, children);

export const useLocation = () => ({ pathname: '/' });

export const useMatch = () => null;
