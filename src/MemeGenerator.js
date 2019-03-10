import React, {Component} from "react"

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state={
            topText:"",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg",
            allMemeImgs:[]
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({allMemeImgs:memes})
            })
    }

    handleClick(event){
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    handleSubmit(event){
        event.preventDefault()
        const randomIndex = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randomIndex].url
        this.setState({randomImg: randMemeImg})
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type = "text"
                        placeholder="Top Text of Meme"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleClick}
                    />
                    <br />

                    <input 
                        type = "text"
                        placeholder="Bottom Text of Meme"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleClick}
                    />
                    <br />

                    <button>Generate</button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt=""/>
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>

                </div>
            </div>
        )
    }
}

export default MemeGenerator