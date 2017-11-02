import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import { Header, MainSection } from '../../components';

import { create } from '@zeos/validation';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: TodoItemData[];
    actions: typeof TodoActions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  state = {
    errors: {
      email: '',
    },
  };

  onPressButton = async () => {
    const validator = create({
      email: [{
        validator: 'email',
        message: 'Error email',
      }],
    });

    const errors = await validator.validate({
      email: 'hello',
    });

    this.setState({ errors });
  }

  render() {
    const { todos, actions, children } = this.props;
    return (
      <div className={style.normal}>
        <button onClick={this.onPressButton}>Button</button>
        <div>Errors: {this.state.errors.email}</div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions as any, dispatch)
  };
}
