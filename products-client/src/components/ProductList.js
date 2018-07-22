import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productAction";
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md';
import './ProductList.css';

class ProductList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { error, loading, products } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="product-list">
        {products.map((product, id) =>
          <Card key={id} className="md-block-centered md-cell card">
          <CardTitle title={product.name} subtitle={
            product.categories.map((category, key) => <span key={key}>{category}</span>)
                              .reduce((prev, curr) => [prev, ' - ', curr])
            } />
          <Grid className="grid-example">
            <Cell size={3}>
                <div className="container">
                  <img src={product.photo}></img>
                </div>
            </Cell>
            <Cell size={7}>
            <CardText>
              <p>{product.description}</p>
              <p><b>Stock:</b> {product.stock}</p>
              <p><b>Price:</b> <span>&#36;</span>{product.price}</p>
          </CardText>
            </Cell>
          </Grid>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(ProductList);