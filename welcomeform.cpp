#include "welcomeform.h"
#include "ui_welcomeform.h"

WelcomeForm::WelcomeForm(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::WelcomeForm)
{
    ui->setupUi(this);
}

WelcomeForm::~WelcomeForm()
{
    delete ui;
}
