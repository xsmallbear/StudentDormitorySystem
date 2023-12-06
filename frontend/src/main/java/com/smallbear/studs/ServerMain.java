package com.smallbear.studs;

import com.smallbear.studs.apis.LoginApi;
import com.smallbear.studs.handles.JsonHandler;
import com.smallbear.studs.handles.LoggingHandler;
import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;

public class ServiceMain {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        ContextHandlerCollection apiHandlers = new ContextHandlerCollection();
        apiHandlers.addHandler(new ContextHandler(new LoginApi(), "/login"));

        Handler.Sequence sequence = new Handler.Sequence();
        sequence.addHandler(new LoggingHandler());
        sequence.addHandler(new JsonHandler());
        sequence.addHandler(apiHandlers);
        ContextHandler webApplication = new ContextHandler("/");
        webApplication.setHandler(sequence);

        server.setHandler(webApplication);

        server.start();
        server.join();
    }


}