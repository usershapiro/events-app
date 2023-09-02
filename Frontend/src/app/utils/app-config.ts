class AppConfig {

    public typesUrl = "http://localhost:3001/api/types/"
    public eventByTypeUrl = "http://localhost:3001/api/event-by-type/"
    public addEventUrl ="http://localhost:3001/api/events/"
    public deleteUrl = "http://localhost:3001/api/delete-event/"

}

export const appConfig = new AppConfig()