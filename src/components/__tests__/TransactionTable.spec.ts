import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import TransactionTable from '@/components/table/TransactionTable.vue';

const transactions = [
    {
      "id": "667b64d8-5b2a-4216-bff3-661e7c9a24af",
      "userId": "875b26e3-2463-4415-b819-511dcd181d9e",
      "merchantId": "d027fb50-2de9-4728-9f69-dfb952fe44bb",
      "amount": 19.28,
      "date": "2024-01-03T00:32:34.206Z"
    },
    {
      "id": "0c81b940-24db-41e4-b89f-85b297cd114b",
      "userId": "518d7ee5-7a69-4efb-a140-d86dd277822f",
      "merchantId": "1808ddf1-15c0-4f80-9a85-f5dff8a8de8c",
      "amount": 6.88,
      "date": "2024-01-04T02:44:36.176Z"
    },
    {
      "id": "fb61b657-5458-4ae8-8655-88394957a6ea",
      "userId": "52895455-4ede-4896-82d4-cd4719ed92d2",
      "merchantId": "3f609d2e-4a66-4e2f-9fbe-99788a43723d",
      "amount": 25.56,
      "date": "2024-01-05T18:07:37.625Z"
    },
    {
      "id": "2d4a040b-0601-4f95-ac35-c0d6994550c1",
      "userId": "6a9b81db-37f7-450f-971a-76345c60c736",
      "merchantId": "d44477d8-0d14-4af6-b269-282537358a50",
      "amount": 24.17,
      "date": "2024-01-01T05:00:53.629Z"
    },
    {
      "id": "7af7eaac-25d7-43d7-8ea8-12570e6ad3a9",
      "userId": "7e5c8766-39e8-45b8-a881-e660d48f10aa",
      "merchantId": "d44477d8-0d14-4af6-b269-282537358a50",
      "amount": 8.72,
      "date": "2024-01-04T21:19:13.657Z"
    },
    {
      "id": "dfa63386-9408-4c9c-b39f-d5f1c8925967",
      "userId": "ee2d5a6b-e737-42a8-a18e-46ba446832b7",
      "merchantId": "933dad02-edc2-49f4-9975-8f067767cb54",
      "amount": 19.69,
      "date": "2024-01-02T15:58:41.856Z"
    },
];

describe('Transaction Table', () => {
    it('renders properly', () => {
        const wrapper = mount(TransactionTable, {
            props: {
                transactions: [],
            }
        });
        expect(wrapper).toBeTruthy();
    });
  
    it('renders info about empty table', () => {
        const wrapper = mount(TransactionTable, {
            props: {
                transactions: [],
            }
        });
        expect(wrapper.text()).toContain('There is no item in table.');
    });

    it('renders pagination in table', () => {
        const wrapper = mount(TransactionTable, {
            props: {
                transactions: transactions,
            }
        });
        expect(wrapper.get('.pagination-wrapper').isVisible()).toBe(true);
    });
  });