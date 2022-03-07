import { Component } from "react";
import "./App.css";
import Control from "./components/control/Control";
import TaskForm from "./components/task/TaskForm";
import TaskList from "./components/task/TaskList";
import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      isDisplaySort: false,
      taskEdit: null,
      filter: {
        name:"",
        status: -1
      },
      keyword:"",
      sortBy:"name",
      sortValue: 1
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  onGenerateData = () => {
    var tasks = [
      {
        id: uuidv4(),
        name: "Học lập trình",
        status: true,
      },
      {
        id: uuidv4(),
        name: "Đi bơi",
        status: false,
      },
      {
        id: uuidv4(),
        name: "Ngủ",
        status: true,
      },
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  onToggeForm = () => {
    if(this.state.isDisplayForm && this.state.taskEdit){
      this.setState({
        isDisplayForm: true,
        taskEdit: null
      });
    }else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEdit: null
      });
    }
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    });
  }

  onSubmit = (data) => {
    const { tasks } = this.state;
    if(data.id ===""){
      data.id = uuidv4();
      tasks.push(data);
    }else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      isDisplayForm: false,
      taskEdit: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  findIndex = (id) => {
    var result = -1;
    var { tasks } = this.state;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;

      }
    })
    // console.log(result);
    return result;
  }
  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index!==-1){
      tasks[index].status = !tasks[index].status;
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onDeleteTask =(id)=>{
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if(index!==-1){
      tasks.splice(index,1);
    }
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.onCloseForm();
  }

  onEdit =(id) =>{
    var { tasks,taskEdit } = this.state;
    var index = this.findIndex(id);
    if(index!==-1){
      taskEdit = tasks[index];
      //console.log(taskEdit);
    }
    this.setState({
      taskEdit: taskEdit,
      isDisplayForm: true
    })
  }
  onFilter= (filterName, filterStatus) =>{
    console.log(filterName+" "+ filterStatus);
    var status=parseInt(filterStatus);
    this.setState({
      filter: {
        name : filterName.toLowerCase(),
        status: status
      }
      
    })
  }

  onSearch =(keyword)=>{
   this.setState({
     keyword: keyword
   })
  }

  onSort = (sort) =>{
     this.setState({
        sortBy: sort.sortBy,
        sortValue: sort.sortValue
    })
    console.log(this.state.sort);
  }
  render() {
    var { tasks, isDisplayForm, taskEdit , filter, keyword, sortBy, sortValue} = this.state;

    if(filter){    
      if(filter.name!==null){
        tasks = tasks.filter((task)=>{
          //console.log("hello");
          return task.name.toLowerCase().indexOf(filter.name) !==-1;
        })
      }
      tasks = tasks.filter((task) => {
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }

    if(keyword){
      tasks = tasks.filter((task)=>{
        //console.log("hello");
        return task.name.toLowerCase().indexOf(keyword) !==-1;
      })
    }

    if(sortBy==="name"){
      tasks.sort((a,b) => {
       // console.log(a);
        
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return - sortValue
        else return 0;
      })
      console.log(tasks);
    }
    else{
      tasks.sort((a,b) => {
       var x = a.status ===true ? 1:-1;
       var y = b.status ===true ? 1:-1;
        //console.log(a);
        //console.log(b.status);
        if(x > y) return - sortValue;
        else if(x < y) return sortValue
        else return 0;
        
      })
      console.log(tasks);
    }

    var elmTaskForm = isDisplayForm === true ? <TaskForm
      onCloseForm={this.onCloseForm}
      onSubmit={this.onSubmit}
      onSetForm = {this.onSetForm}
      taskEdit = {taskEdit}
     
    /> : ""
    return (

      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "col-xs-0 col-sm-0 col-md-0 col-lg-0"}>
            {elmTaskForm}
          </div>
          <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.onToggeForm}>
              <span
                className="fa fa-plus mr-5"
                style={{ marginRight: "5px" }}
              ></span>
              Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={this.onGenerateData}
            >
              Generate Data
            </button>
            <Control onSearch = {this.onSearch} onSort={this.onSort}/>
            <TaskList tasks={tasks}
              onUpdateStatus={this.onUpdateStatus}
              onDeleteTask={this.onDeleteTask}
              onEdit ={this.onEdit}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}
