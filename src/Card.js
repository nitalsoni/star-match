import React, { useState } from 'react';
import axios from "axios";

export const CardList = (props) => (
    <div>
        {props.profiles.map((profile) => <Card key={profile.id} {...profile}></Card>)}
    </div>
);

export class Form extends React.Component {
    state = { userName: '' };
    handleSubmit = async (event) => {
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onAdd(resp.data);
        this.setState({ userName: '' });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value })}
                    placeholder='Github username'
                    required
                />

                <input type='submit' value='Add Card'></input>
            </form>
        );
    }
}

class Card extends React.Component {
    render() {
        const profile = this.props;

        return (
            <div style={{ margin: '1rem' }}>
                <img src={profile.avatar_url} style={{ height: 75, width: 75 }}></img>
                <div style={{ display: 'inline-block', marginLeft: 10 }}>
                    <div style={{ fontSize: '130%' }}>{profile.name}</div>
                    <div>{profile.company}</div>
                </div>
            </div>
        );
    }
}
