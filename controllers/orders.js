const db = require('../database');

exports.getRestaurantsUncompletedOrdersById = (req, res) => {
    db.query(`SELECT idOrder, FirstName,LastName, Date, Status, Address  FROM product_order JOIN user ON product_order.idUser=user.idUser WHERE idRestaurant=${req.params.id} AND Status != 'Delivered'`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}

exports.getRestaurantCompletedOrdersById = (req, res) => {
    
    
    db.query(`SELECT idOrder, FirstName,LastName,Date, Address FROM product_order JOIN user ON product_order.idUser=user.idUser WHERE idRestaurant=${req.params.id} AND Status = 'Delivered'`, (error, result) => {
        if(error) console.log(error)
         return res.json(result);
        
        
       
         })
}  

        
       



exports.newOrder = (req, res) => {
    console.log(req.body)
    db.query(`INSERT into product_order values("${req.body.idOrder}", ${req.body.idUser}, "Received", "${req.body.date}", ${req.body.idRestaurant}, "${req.body.address}")`, (error, result) => {
        if(error){
            res.status(400).send({msg: "error"});
            console.log(error);
        }
    })
    req.body.items.forEach(element => {
        db.query(`INSERT into order_item values("${req.body.idOrder}", ${element.id}, ${element.quantity})`, (error, result) => {
            if(error){
                res.status(400).send({msg: "error"})
                console.log(error);
            }
        })
    });
    res.send("Order received")
}

exports.changeOrderStatus = (req, res) => {
    console.log(req.body);
    db.query(`UPDATE product_order SET Status = '${req.body.status}' WHERE idOrder =${req.body.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}


exports.getOrdersByCustomerId = (req, res) => {
    db.query(`SELECT * from product_order where idUser=${req.params.id}`, (error, result) => {
        if(error){
            res.status(400).send({msg: "error"});
        }
        res.send(result);
    })
}

exports.getOrderItems = (req, res) => {
    console.log(req.params);
    db.query(`SELECT item.name, item.price, Quantity FROM order_item JOIN item ON order_item.idItem=item.idItem  WHERE idOrder ="${req.params.id}"`, (error, result) => {
        if(error) res.status(400).send({msg: "error"})
        res.send(result);
    })
}

