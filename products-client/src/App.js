import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { toTitle } from 'utils-strings';
import { NavigationDrawer, TextField } from 'react-md';
import logo from './logo.svg';
import './App.css';
import ProductList from './components/ProductList';
import NavItemLink from './components/NavItemLink';
import * as productAction from './actions/productAction';

import { TabsContainer, Tabs, Tab } from 'react-md';

const TO_PREFIX = '';

const navItems = [{
  label: 'Services',
  to: TO_PREFIX,
  exact: true,
  icon: 'room_service',
}, {
  label: 'Office',
  to: `${TO_PREFIX}/starred`,
  icon: 'computer',
}, {
  label: 'Tech',
  to: `${TO_PREFIX}/send-mail`,
  icon: 'phonelink',
}];


class App extends Component {
  
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super();
  }

  handleChangeSearch(value, e){
    let searchValue = value;
    this.props.filterContacts(searchValue);
  }
  

  getCurrentTitle = ({ location: { pathname } }) => {
    const lastSection = pathname.substring(pathname.lastIndexOf('/') + 1);
    if (lastSection === 'navigation-drawers') {
      return 'Inbox';
    }

    return toTitle(lastSection);
  };

  render() {

    return (
      <TabsContainer panelClassName="md-grid" colored>
          <Tabs tabId="simple-tab" centered="true" >
      
      <Tab label="Products">
      
      <NavigationDrawer
        drawerTitle="Categories"
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        navItems={navItems.map(props => <NavItemLink {...props} key={props.to} />)}
      >

        <TextField
        id="floating-center-title"
        label="Search"
        lineDirection="center"
        placeholder="search anything"
        className="md-cell md-cell--bottom"
        name="search"
        onChange={this.handleChangeSearch.bind(this)}
      />
        <Switch>
          <Route path={navItems[0].to} exact component={ProductList} />
          <Route path={navItems[1].to} component={ProductList} />
          <Route path={navItems[2].to} component={ProductList} />
        </Switch>

      </NavigationDrawer>
      </Tab>
      <Tab label="Contact">
              <h3>Now look at me!</h3>
      </Tab>
      </Tabs>
      </TabsContainer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    products: state.products.items
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    filterContacts: searchValue => dispatch(productAction.filterProducts(searchValue))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
