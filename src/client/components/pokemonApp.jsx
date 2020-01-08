import React from 'react';

class PokemonApp extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Pokedex />
            </div>
        )
    }
}

class Pokedex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {pokedex: [], pokemon: null, pokemonText: null, fetchedPokedex: false, fetchedPokemon: false, fetchedPokemonText: false}
        this.fetchPokemonDetail = this.fetchPokemonDetail.bind(this)
        this.backButton = this.backButton.bind(this)
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(response => response.json())
            .then(result => {
                this.setState({pokedex: result.results, fetchedPokedex: true})
            })
    }

    render() {
        if (this.state.fetchedPokemon && this.state.fetchedPokemonText) {
            return this.renderPokemonDetail()
        } else if (this.state.fetchedPokedex) {
            return this.renderPokedex()
        } else {
            return (<div>Loading...</div>)
        }
    }

    fetchPokemonDetail(url, number) {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                this.setState({pokemon:result, fetchedPokemon:true})
            })

        fetch('https://pokeapi.co/api/v2/pokemon-species/' + number)
            .then(response => response.json())
            .then(result => {
                for (var i = 0; i < result.flavor_text_entries.length; i++) {
                    if (result.flavor_text_entries[i].language.name == 'en') {
                        this.setState({ pokemonText: result.flavor_text_entries[i].flavor_text, fetchedPokemonText: true })
                        break
                    }
                }
            })
    }

    backButton() {
        this.setState({fetchedPokemon:false, fetchedPokemonText:false})
    }

    renderPokedex() {
        return (
            <div className='pokedexBorder'>
                    {this.state.pokedex.map((pokemon, index) =>
                        (<Pokemon url={pokemon.url} name={pokemon.name} key={index} number={index + 1} fetchPokemonDetail={this.fetchPokemonDetail} />))}
            </div>
        )
    }

    renderPokemonDetail() {
        return (
            <div>
                {<PokemonDetail pokemon={this.state.pokemon} backButton={this.backButton} pokemonText={this.state.pokemonText} />}
            </div>
        )
    }
}

class Pokemon extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.props.fetchPokemonDetail(this.props.url, this.props.number)
    }

    render() {
            return (this.renderPokemon())
    }

    renderPokemon() {
        return (
            <a href='javascript:' onClick={this.handleClick}>
                <p>abc</p>
            </a>
        )
    }
}
//<img className='pokemonSpriteSmall' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.props.number + ".png"} />
class PokemonDetail extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.props.backButton()
    }

    render() {
        return (
            <div className='pokemonDetailContainer'>
                <div className='pokemonSpriteContainer'>
                    <img className='pokemonSpriteLarge' src={this.props.pokemon.sprites.front_default}></img>
                </div>
                <div className='text-center'>
                    <h1>{this.props.pokemon.name}</h1>
                    <h4>{this.props.pokemonText}</h4>
                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>Back</button>
                </div>
            </div>
        )
    }
}

export default PokemonApp;