import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  // fetch orders when this component gets mounted
  componentDidMount() {
    axios.get('/orders.json')
      .then(res =>  {
        const rawData = res.data || {};
        console.log('Object Keys/Order Id\'s: ', Object.keys(rawData));
        // turn orders object into an array
        const fetchedOrders = Object.keys(rawData).reduce((prevData, id) => {
          // push order
          prevData.push({ ...rawData[id], id });
          return prevData;
        }, []);
        console.log(fetchedOrders);
        this.setState({ loading: false, orders: fetchedOrders })
      })
      .catch(err => {
        this.setState({ loading: false })
      });
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);