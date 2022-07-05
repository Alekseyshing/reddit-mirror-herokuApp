import { configureStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import thunk from "redux-thunk";
import '../src/shared/UI/main.global.css';
import { postsContext } from "./context/postsContext";
import { UserContextProvider } from "./context/userContext";
import { rootReducer } from "./redux/store/store";
import { CardsList } from "./shared/Components/CardsList";
import { PostListPlug } from "./shared/Components/CardsList/PostListPlug";
import { Content } from "./shared/Components/Content";
import { Header } from "./shared/Components/Header/Header";
import { NoMatch } from "./shared/Components/NoMatch";
import { Post } from "./shared/Components/Post";
import { Layout } from "./shared/UI/Layout";
import { usePostsData } from "./utils/react/hooks/usePostsData";
import { useToken } from "./utils/react/hooks/useToken";
import ProtectedRoute from "./utils/react/ProtectedRoute";

const store = configureStore({ reducer: rootReducer, middleware: [thunk], })

function AppComponent() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    //@ts-ignore
  }, []);

  useEffect(() => {
    if (store.getState().loggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const [token] = useToken();
  const [posts] = usePostsData(token);


  return (
    <UserContextProvider>
      <Layout>
        <Header />
        {mounted && (
          <BrowserRouter>
            <Content>
              <postsContext.Provider value={posts}>
                <Switch>
                  <Route exact path="/">
                    {isLoggedIn ? <Redirect to="/posts" /> : <PostListPlug />}
                  </Route>
                  <Route path="/auth">
                    {isLoggedIn ? <Redirect to="/posts" /> : <PostListPlug />}
                  </Route>
                  <ProtectedRoute isAuthenticated={isLoggedIn} authenticationPath={"/posts"}>
                    <CardsList />
                    <Route path="/posts/:id">
                      <Post />
                    </Route>
                  </ProtectedRoute>
                  <Route path="/*" exact={true}>
                    <NoMatch />
                  </Route>
                </Switch>
              </postsContext.Provider>
            </Content>
          </BrowserRouter>
        )}
      </Layout>
    </UserContextProvider>
  )
}

export const App = hot(() => <Provider store={store}><AppComponent /></Provider>);



