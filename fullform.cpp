#include "fullform.h"
#include "ui_fullform.h"

FullForm::FullForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::FullForm)
{
    ui->setupUi(this);
//    ui->gridLayout->addWidget(F_commonform);
//    this->F_commonform->show();
}

FullForm::~FullForm()
{
    delete ui;






}
