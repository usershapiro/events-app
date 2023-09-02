class AppConfig {

    //database
    public salesEmail ="osherad@gmail.com";
    public helpPage =  "http://northwind.com/help";
    
}
//Development config:
class DevelopmentConfig extends AppConfig{
public  isDevlopment = true;
public isProduction = false;
public host="localhost"
public user="root"
public password =""
public database = "events-app"
 public port=3001
 public frontEndUrl = "http://localhost:3000";

}

class ProductionConfig extends AppConfig{
    public  isDevlopment = false;
    public isProduction = true;
    public host=""
    public user=""
    public password =""
    public database = ""
     public port=0
     public frontEndUrl = "http://events-app.com";
    
    }
const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new  DevelopmentConfig();
export default appConfig