import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  // fetch orders when this component gets mounted
  componentDidMount() {
    this.setState({ loading: true });

    axios.get('/orders.json')
      .then(res =>  {
        const rawData = res.data || {};
        console.log('Object Keys/Order Id\'s: ', Object.keys(rawData));
        // turn orders object into an array of object
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
    const { orders, loading } = this.state;

    let order = (
      orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          />
      ))
    );

    if (loading) {
      order = <Spinner />
    }

    return (
      <div>
        {order}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);