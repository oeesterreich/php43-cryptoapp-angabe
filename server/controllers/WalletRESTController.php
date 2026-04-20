<?php

require_once('RESTController.php');
require_once('models/Wallet.php');
require_once('models/Purchase.php');

class WalletRESTController extends RESTController
{
    public function handleRequest()
    {
        switch ($this->method) {
            case 'GET':
                $this->handleGETRequest();
                break;
            case 'POST':
                $this->handlePOSTRequest();
                break;
            case 'DELETE':
                $this->handleDELETERequest();
                break;
            default:
                $this->response('Method Not Allowed', 405);
                break;
        }
    }

    /**
     * all wallets:              GET api.php?r=wallet
     * single wallet:            GET api.php?r=wallet/1
     * purchases of wallet:      GET api.php?r=wallet/1/purchase -> verb = purchase, args[0] = 1
     */
    private function handleGETRequest()
    {
        if ($this->verb == 'purchase' && sizeof($this->args) == 1) {
            $this->response(Wallet::getPurchases($this->args[0]), 200);
        } elseif ($this->verb == null && sizeof($this->args) == 1) {
            $item = Wallet::get($this->args[0]);
            if ($item != null) {
                $this->response($item, 200);
            } else {
                $this->response("Not Found", 404);
            }
        } elseif ($this->verb == null && sizeof($this->args) == 0) {
            $this->response(Wallet::getAll(), 200);
        } else {
            $this->response("Not Found", 404);
        }
    }

    /**
     * create wallet: POST api.php?r=wallet
     */
    private function handlePOSTRequest()
    {
        $model = new Wallet();
        $model->setName($this->getDataOrNull('name'));

        if ($model->save()) {
            $this->response("OK", 201);
        } else {
            $this->response($model->getErrors(), 400);
        }
    }

    /**
     * delete wallet: DELETE api.php?r=wallet/1
     */
    private function handleDELETERequest()
    {
        if ($this->verb == null && sizeof($this->args) == 1) {
            Wallet::delete($this->args[0]);
            $this->response("OK", 200);
        } else {
            $this->response("Not Found", 404);
        }
    }
}