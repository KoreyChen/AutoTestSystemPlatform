#include "canform.h"
#include "ui_canform.h"

CanForm::CanForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::CanForm)
{
    ui->setupUi(this);
}

CanForm::~CanForm()
{
    delete ui;
}

