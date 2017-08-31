
import counterByRedux from 'counterByRedux';
//
// let $in = $('.increment'),
//     $de = $('.decrement'),
//     $val = $('.val');
//
// let counterVal = 0;
//
// $val.val(counterVal);
//
// $in.click(ev=>{
//     $val.val(++counterVal);
// });
//
// $de.click(ev=>{
//     $val.val(--counterVal);
// });

// export default class App extends Component{
//     constructor(props){
//         super(props);
//         this.state = {moli:{a:1,b:2}}
//         // this.state = {a:1,b:2}
//     }
//
//     componentDidMount(){
//         let a = 67;
//         this.setState({ moli:{...this.state.moli, a} })
//         // 67 2
//         // b: 2 a: 67
//         console.log({...this.state.moli, a});
//         // this.setState({a})
//         console.log(this.state.moli);
//         let b = 89;
//         this.setState({ moli:{...this.state.moli, b} })
//         // this.setState({b})
//     }
//
//     render(){
//         return (
//             <div>
//                 <div>a:{this.state.moli.a}</div>
//                 <div>b:{this.state.moli.b}</div>
//             </div>
//         )
//     }
// }

// ReactDOM.render(
//     <App/>,
//     document.getElementById('root')
// );



// 先有一个store
// 有一个reduce
// 如果有状态改变的需求， 需要有相应的action
//
// 有一个监听器 去渲染数据
