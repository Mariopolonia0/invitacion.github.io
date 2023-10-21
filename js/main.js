

function Enviar() {

    try {
        //var connection = new ActiveXObject("ADODB.Connection");
        var connection = new ActiveXObject("Scripting.FileSystemObject");

        var connectionstring = "workstation id=bodaVicente.mssql.somee.com;packet size=4096;user id=mariopolonia0_SQLLogin_1;pwd=platiw5ozg;data source=bodaVicente.mssql.somee.com;persist security info=False;initial catalog=bodaVicente";
        connection.Open(connectionstring);
        alert(connection)
        /*
                var rs = new ActiveXObject("ADODB.Recordset");
        
                rs.Open("SELECT * FROM table", connection);
                rs.MoveFirst
        
                while (!rs.eof) {
                    document.write(rs.fields(1));
                    rs.movenext;
                }
        
                rs.close;
                connection.close;*/
    } catch (ex) {
        alert("Error: " + ex)

    }
}