import express from 'express';
import cors from 'cors';
import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.initOracleClient();

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;

app.listen(port || 5000,()=>{
    console.log(`serwer nasłuchuje na porcie ${port}`);
});

app.get("/",(req,res)=>{
    res.send("siema to serwer");
})

app.get('/api',(req,res)=>{
    res.json({
        tab: ["maciek","karo","szymon","mareczek","eeeelka"]
    });
})

app.get("/data",(req,res)=>{
    async function fetchData(){
        try {
            const connection = await oracledb.getConnection({
                user: "msbd14",
                password: "haslo2023",
                connectionString: "155.158.112.45/oltpstud"
            })

            const result = await connection.execute("select first_name,last_name from employees");
            return result.rows

        } catch(err){
            console.error(err);
        }
        
    }

    fetchData()
    .then(dbRes => {
        res.json({
            tab: dbRes
        });
    })
    .catch(err=>{
        res.send(err)
    })
})

app.get("/data2",(req,res)=>{
    async function fetchData(){
        try {
            const connection = await oracledb.getConnection({
                user: "msbd14",
                password: "haslo2023",
                connectionString: "155.158.112.45/oltpstud"
            })

            const result = await connection.execute("select department_name from departments");
            return result.rows

        } catch(err){
            console.error(err);
        }
        
    }

    fetchData()
    .then(dbRes => {
        res.json({
            tab2: dbRes
        });
    })
    .catch(err=>{
        res.send(err)
    })
})

app.get("/data3",(req,res)=>{
    async function fetchData(){
        try {
            const connection = await oracledb.getConnection({
                user: "msbd14",
                password: "haslo2023",
                connectionString: "155.158.112.45/oltpstud"
            })

            const result = await connection.execute("select first_name,last_name from employees order by ((select sysdate from dual) - hire_date) desc");
            return result.rows

        } catch(err){
            console.error(err);
        }
        
    }

    fetchData()
    .then(dbRes => {
        res.json({
            bestEmp: dbRes
        });
    })
    .catch(err=>{
        res.send(err)
    })
})