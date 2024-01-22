import { rest } from 'msw';

import { ORG_LIST } from '@/_mock/assets';
import { OrgApi } from '@/api/services/orgService';

const orgList = rest.get(`/api${OrgApi.Org}`, (req, res, ctx) => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  return res(
    ctx.json({
      status: 0,
      message: '',
      data: ORG_LIST.slice(0, randomNumber),
    }),
  );
});

export default [orgList];
