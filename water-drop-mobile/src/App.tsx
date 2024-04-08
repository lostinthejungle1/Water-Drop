import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input } from 'antd-mobile';
import { FIND, UPDATE } from './graphql/demo';

const App = () => {
  const { loading, data } = useQuery(FIND, {
    variables:
    {
      id: 'ba05580d-d648-4010-ae9e-0ca1c6a4f68d',
    },
  });

  const [update] = useMutation(UPDATE);

  const submitHandler = (v:any) => {
    console.log('v', v);
    update({
      variables: {
        id: 'ba05580d-d648-4010-ae9e-0ca1c6a4f68d',
        params: {
          name: v.name,
        },
      },
    });
  };
  return (
    <div>
      <p>
        data:
        {JSON.stringify(data)}
      </p>
      <p>
        Loading:
        {`${loading}`}
      </p>
      <Form
        layout="horizontal"
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
      )}
        onFinish={submitHandler}
      >
        <Form.Item name="name" label="name">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
