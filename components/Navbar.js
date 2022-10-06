import PropTypes from "prop-types";
import Link from "next/link";
import { Media, MediaContextProvider } from "./media";
import styles from "./Navbar.module.css";

import React, { Component, useState } from "react";

import {
  Segment,
  Grid,
  List,
  Header,
  Container,
  Visibility,
  Menu,
  Button,
  Sidebar,
  Icon,
} from "semantic-ui-react";

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Visualize Algorithms"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em",
      }}
    />
    <Header
      as="h2"
      content="Graph complexities of your algorithms!"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em",
      }}
    />
    <Button primary size="huge">
      <Link href="/vis">
        <i>Get Started</i>
      </Link>
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children, withHeader, activeTab, menuItems } = this.props;
    const { fixed } = this.state;

    return (
      <>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: withHeader ? 700 : "auto", padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container className={styles.justifyCenter}>
                {Object.keys(menuItems).map((menuItem) => (
                  <Link href={menuItems[menuItem]} key={menuItem}>
                    <Menu.Item as="a" active={activeTab == menuItem}>
                      {menuItem}
                    </Menu.Item>
                  </Link>
                ))}
                {/* <Menu.Item as="a">Careers</Menu.Item> */}
                {/* <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item> */}
              </Container>
            </Menu>
            {withHeader ? <HomepageHeading /> : ""}
          </Segment>
        </Visibility>

        {children}
      </>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

class MobileContainer extends Component {
  state = {};

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children, withHeader, activeTab, menuItems } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            {Object.keys(menuItems).map((menuItem) => (
              <Link href={menuItems[menuItem]} key={menuItem}>
                <Menu.Item as="a" active={activeTab == menuItem}>
                  {menuItem}
                </Menu.Item>
              </Link>
            ))}
            {/* <Menu.Item as="a">Careers</Menu.Item> */}
            {/* <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item> */}
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign="center"
              style={{
                minHeight: withHeader ? 350 : "auto",
                padding: "1em 0em",
              }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  {/* <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item> */}
                </Menu>
              </Container>
              {withHeader ? <HomepageHeading mobile /> : ""}
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
};

const ResponsiveContainer = ({
  children,
  withHeader,
  activeTab,
  menuItems = null,
}) => {
  if (menuItems == null) {
    menuItems = {
      Home: "/",
      Editor: "/vis",
      About: "/about",
    };
  }

  return (
    /* Heads up!
     * For large applications it may not be best option to put all page into these containers at
     * they will be rendered twice for SSR.
     */
    <MediaContextProvider disableDynamicMediaQueries>
      <Media greaterThanOrEqual="computer">
        <DesktopContainer
          menuItems={menuItems}
          withHeader={withHeader ? withHeader : false}
          activeTab={activeTab}
        >
          {children}
        </DesktopContainer>
      </Media>
      <Media lessThan="computer" as={Sidebar.Pushable}>
        <MobileContainer
          menuItems={menuItems}
          activeTab={activeTab}
          withHeader={withHeader ? withHeader : false}
        >
          {children}
        </MobileContainer>
      </Media>
    </MediaContextProvider>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

export default function Navbar({ withHeader, activeTab }) {
  return <ResponsiveContainer withHeader={withHeader} activeTab={activeTab} />;
}
