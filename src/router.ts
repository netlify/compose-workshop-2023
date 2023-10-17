// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client';

export type Path = `/` | `/about` | `/books/:id` | `/spook` | `/swag/:slug`;

export type Params = {
  '/books/:id': { id: string };
  '/swag/:slug': { slug: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
