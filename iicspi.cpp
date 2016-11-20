#include "iicspi.h"
#include "ui_iicspi.h"

IICSPI::IICSPI(QWidget *parent):
    QWidget(parent),
    ui(new Ui::IICSPI)
{
    ui->setupUi(this);
}

IICSPI::~IICSPI()
{
    delete ui;
}




