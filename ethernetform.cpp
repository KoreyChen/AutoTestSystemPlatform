#include "ethernetform.h"
#include "ui_ethernetform.h"

EthernetForm::EthernetForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::EthernetForm)
{
    ui->setupUi(this);
}

EthernetForm::~EthernetForm()
{
    delete ui;
}
