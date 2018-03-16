//
//  MyPopOverViewController.swift
//  Popovertester
//
//  Created by Humad Syed on 3/15/18.
//  Copyright © 2018 Humad Syed. All rights reserved.
//

import UIKit

class MyPopOverViewController: UIViewController, PopOverViewController {
    var delegate: PopOverModal?
    

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func close(_ sender: Any) {
        self.delegate?.closePopOver()
    }
    
    @IBAction func open(_ sender: Any) {
        self.delegate?.openNextPopOver()
    }
}

protocol PopOverViewController: class {
    weak var delegate: PopOverModal? {get set}
}
